auth - login
Example 
input entrada:

{
  "email": "empresa@gama.com",
  "password": "12345678"
}

output-Salida:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMWE2MmRjMS01MDA0LTRmZmEtYTNmZC0wMzU3ZjZiNzM5ZmYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3Mjc0NTk0NSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.Kw9lrajBRtb3v8FFUYznn68l54LM7KK8jqNEXSlhcRY",
  "refreshToken": "AMf-vByl5xunjOEgWzPgqujDXcw5OsHZc-Y8Tzsh1aj0-XzzgQlTAK-wO0Dij8AJLNi1DSXto4IlfRHLVI6SCHl5ue1K8MA9Lr9uNf99Yi2q78DiJ5jkLg6w9NCBy2q9und8CaQIA0Hgt6xeksDfhlb5x-ard8lFA3ThAlM2Jq99771XDowKYcUxs3G65E5330CmqQKMqhRAy5pVY-cmbtIe_y0Z2MJU-hw5lMrXCFyvqiq2SqSlQ9ETj3XyMYmXNiHwSpy4wohe",
  "userId": "kKdbmZaF5ogQ0eP7XgQxngABTxe2",
  "userContext": {
    "accountStatus": "Activo",
    "accountRejectionReason": null,
    "userType": "Empresa",
    "modules": [
      {
        "name": "Construccion",
        "status": "Activo",
        "rejectionReason": null
      },
      {
        "name": "Inventario",
        "status": "Pendiente",
        "rejectionReason": null
      }
    ],
    "tags": [],
    "profile": {
      "name": "Constructora Andes S.R.L.",
      "fotoUrl": "https://www.fotoURL.com"
    }
  }
}


Refresh Token:/ api/Auth/refresh-token Renueva el token de acceso usando un Refresh Token.
entrada:


{
  "refreshToken": "string"
}

Salida:

	
Response body
Download
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzA4MWExYi0xM2QxLTQ5OWUtOTQxNS1kZGM5YTQwOWJhOTkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3Mjc0NjM2MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.naYtZHoFUle4CETWMPQAJ7ETDFv4RHAjtCUFuUXxtfY",
  "refreshToken": "AMf-vByl5xunjOEgWzPgqujDXcw5OsHZc-Y8Tzsh1aj0-XzzgQlTAK-wO0Dij8AJLNi1DSXto4IlfRHLVI6SCHl5ue1K8MA9Lr9uNf99Yi2q78DiJ5jkLg6w9NCBy2q9und8CaQIA0Hgt6xeksDfhlb5x-ard8lFA3ThAlM2Jq99771XDowKYcUxs3G65E5330CmqQKMqhRAy5pVY-cmbtIe_y0Z2MJU-hw5lMrXCFyvqiq2SqSlQ9ETj3XyMYmXNiHwSpy4wohe",
  "userId": "kKdbmZaF5ogQ0eP7XgQxngABTxe2",
  "userContext": {
    "accountStatus": "Activo",
    "accountRejectionReason": null,
    "userType": "Empresa",
    "modules": [
      {
        "name": "Construccion",
        "status": "Activo",
        "rejectionReason": null
      },
      {
        "name": "Inventario",
        "status": "Pendiente",
        "rejectionReason": null
      }
    ],
    "tags": [],
    "profile": {
      "name": "Constructora Andes S.R.L.",
      "fotoUrl": "https://www.fotoURL.com"
    }
  }
}

Change password:

Entrada: 
{
  "currentPassword": "12345678",
  "newPassword": "123456789",
  "confirmNewPassword": "123456789"
}

Salida:

curl -X 'POST' \
  'https://localhost:42431/api/Auth/change-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMWE2MmRjMS01MDA0LTRmZmEtYTNmZC0wMzU3ZjZiNzM5ZmYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3Mjc0NTk0NSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.Kw9lrajBRtb3v8FFUYznn68l54LM7KK8jqNEXSlhcRY' \
  -H 'Content-Type: application/json' \
  -d '{
  "currentPassword": "12345678",
  "newPassword": "123456789",
  "confirmNewPassword": "123456789"
}'
