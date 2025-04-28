from flask import Flask, request
from flask_cors import CORS  # Import CORS
import time
import requests
from pprint import pprint

from linkedin_api import Linkedin

from utilities.call_openai_file import call_openai

# Initialize the API client

from emailfinder.extractor import *

import json


app = Flask(__name__)
CORS(app)  # Enable CORS for all requests

@app.route('/get-profile', methods = ['GET'])
def get_profile():
    profileId = request.args.get('profile')
    api = Linkedin('atalamba@middlebury.edu', 'dont look here')
    profile = api.get_profile(public_id=profileId)

    return {'profile': profile}


@app.route('/search-by-company', methods = ['GET'])
def search_by_company():
    print('started execution')

    company = request.args.get('company')

    print('url', company)

    parts = company.split("/")
    index = parts.index('company')
    company_id = parts[index + 1]
    
    api = Linkedin('atalamba@middlebury.edu', 'dont look here')

    search_results = api.search_people(
        keyword_company = company_id,
    )

    pprint(search_results)
    return {'search_results': search_results}
    
        


#MAKE IT POST TO QUERY ALL AT ONCE. NO ASYNC BULLSHIT ON THE FRONTEND
@app.route('/search-profile', methods = ['POST'])
def search_profile():
    data = request.get_json()


    profile_list = data.get('idList')

    linkedin_profiles = []

    api = Linkedin('atalamba@middlebury.edu', "bro don't look here")

    for person in profile_list: 
        profile = api.get_profile(public_id=person)
        profile["id"] = person
        linkedin_profiles.append(profile)
        pprint(profile)

    return {"profileList": linkedin_profiles}
    






@app.route('/get-message', methods = ['POST'])
def get_message():
    data = request.get_json()

    profile = data.get("profile")
    template = data.get("template")
    instructions = data.get("instructions")
    message = data.get("message")  # The current message (could be empty or AI-generated)

    company = None
    domain = None

    if "student" in profile:
        if profile['student'] == True:
            if len(profile['education'] > 0):
                if 'schoolName' in profile['experience'][0]:
                    company = profile['experience'][0]['schoolName']

    if 'experience' in profile:
        if len(profile['experience']) > 0:
            if 'companyName' in profile['experience'][0]:
                company = profile['experience'][0]['companyName']
                print("COMPANY:", company)


    if company is not None and message == '':
        content_for_domain = f"""
        Please browse the internet and find the domain for this company: {company}.
        Make sure to return only the domain, and omit anything that comes after .com
        I want an output that is only, and only <domain>.com or <domain>.co, etc
        """
        domain = call_openai(content_for_domain)
    
        emails = []
        if domain is not None:
            emails = get_emails_from_bing(domain)
    
    if message == '':
        if emails != []:
            content_for_message = f"""
            You will write an outreach email for this person. I have provided you with the template
        your email must take, with data about the person, and with any instructions. Any line in the template that contains [square brackets]
        means you must complete it with information from the profile I provided, or from the instructions. The instructions can contain information
        about either myself, or about the tone.
        template: {template}
        profile: {profile}
        instructions: {instructions}

        I have also provided you with a list of email address examples for the company this person currently works at.
        Please take example from those email addresses formats and give me the email address I should use to contact this person.
        list of email examples: {emails}

        your response will be include the email address, the object for the email, and the email message

        """
        else: 
            content_for_message = f"""
            You will write an outreach email for this person. I have provided you with the template
        your email must take, with data about the person, and with any instructions. Any line in the template that contains [square brackets]
        means you must complete it with information from the profile I provided, or from the instructions. The instructions can contain information
        about either myself, or about the tone.
        template: {template}
        profile: {profile}
        instructions: {instructions}

        your response will be include the object for the email and the email message

    """
    else: 
        content_for_message = f"""
Please modify this message while following the template, and especially following the instructions provided:
template: {template}
message: {message}
instructions: {instructions}
"""
        

    ai_generated_message = call_openai(content_for_message)

    return {"message": ai_generated_message}


    




if __name__ == '__main__':
    app.run(debug=True)
