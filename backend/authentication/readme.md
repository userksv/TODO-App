Register:
curl -XPOST -H "Content-type: application/json" -d '{
"username": "user1",
"password1": "complexpassword123",
"password2": "complexpassword123"
}' 'http://localhost:8000/api/auth/register/'

Login:
curl -XPOST -H "Content-type: application/json" -d '{
"username": "user1",
"password": "complexpassword123"
}' 'http://localhost:8000/api/auth/login/' | jq

User details:
curl -XGET -H 'Authorization: Token <your_token>' \
 -H "Content-type: application/json" 'http://localhost:8000/api/auth/user/' | jq

Logout:
curl -XPOST -H 'Authorization: Token <your_token>' \
 -H "Content-type: application/json" 'http://localhost:8000/api/auth/logout/' | jq
