from openai import OpenAI
client = OpenAI(api_key = "get out of here you won't know it")

def call_openai(content):

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a human person"},
            {
                "role": "user",
                "content": content
            }
        ]
    )
    #print(completion.choices[0].message.content)
    return completion.choices[0].message.content

#call_openai()