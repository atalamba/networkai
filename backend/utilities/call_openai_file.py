from openai import OpenAI
client = OpenAI(api_key = "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")

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