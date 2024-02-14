import requests

response = requests.get('http://localhost:3000/api/data')

data = response.json()
print(data)
