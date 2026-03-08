Resources
GET
/api/Resources
Obtiene una lista paginada de insumos (recursos).

Entrada:

Name	Description
pageNumber
integer($int32)
(query)
Número de página (default: 1).

1
pageSize
integer($int32)
(query)
Tamaño de página (default: 10).

10


Salida:

[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "unitName": "string",
    "unitAbbreviation": "string",
    "basePrice": 0,
    "code": "string",
    "type": "Materiales",
    "isGlobal": true
  }
]


POST
/api/Resources
Crea un nuevo insumo (Material, Obrero o Equipo).
Entrada:

{
  "name": "cemento",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "basePrice": 0,
  "type": "Materiales",
  "code": "string"
}

Salida:

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/Resources' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "cemento",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "basePrice": 0,
  "type": "Materiales",
  "code": "string"
}'

PUT
/api/Resources/{id}
Actualiza un insumo existente.

Entrada:

Name	Description
id *
string($uuid)
(path)
ID del recurso.

f0ad0358-45a5-462c-9edc-1896874e62dc


Salida:

{
  "id": "f0ad0358-45a5-462c-9edc-1896874e62dc",
  "name": "cemenUpdate",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "basePrice": 0,
  "code": "string"
}


DELETE
/api/Resources/{id}
Elimina (Soft Delete) un insumo.

entrada: 
id *
string($uuid)
(path)
ID del recurso.

id









Units:


GET
/api/Units
Obtiene todas las unidades de medida disponibles.


[
  {
    "id": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
    "name": "Año",
    "abbreviation": "año",
    "isGlobal": true
  },
  {
    "id": "69a89d74-5c3e-473a-afc0-3aecb4cf328c",
    "name": "Balde",
    "abbreviation": "balde",
    "isGlobal": true
  },
  {
    "id": "1ca79573-7f6a-42ee-accd-a211b3569278",
    "name": "Balde 10litros",
    "abbreviation": "balde 10ltr",
    "isGlobal": true
  },
  {
    "id": "13b44cfc-4ec6-4b74-b0cb-4eb93a8e906a",
    "name": "Balde 16litros",
    "abbreviation": "balde 16ltr",
    "isGlobal": true
  },
  {
    "id": "0760e640-577e-47d7-9748-362c5c9d9b59",
    "name": "Balde 18 litros",
    "abbreviation": "balde 18ltr",
    "isGlobal": true
  },
  {
    "id": "10907fdc-6b28-4dbe-adc2-67aa95f02813",
    "name": "Barra",
    "abbreviation": "barra",
    "isGlobal": true
  },
  {
    "id": "9c3d2628-b373-4803-87d8-a166296b3ac7",
    "name": "barra 12m",
    "abbreviation": "barra 12m",
    "isGlobal": true
  },
  {
    "id": "bfd1bc7c-b661-4e54-a0bf-b9a885dedf4b",
    "name": "barra 15m",
    "abbreviation": "barra 15m",
    "isGlobal": true
  },
  {
    "id": "8e477765-45d4-4617-a5c8-d9eb9f43bebf",
    "name": "Barra 4m",
    "abbreviation": "barra 4m",
    "isGlobal": true
  },
  {
    "id": "025471b5-4e53-4926-b73f-ecbe6ab372f8",
    "name": "Barra 6m",
    "abbreviation": "barra",
    "isGlobal": true
  },
  {
    "id": "cb038a4b-ca26-4467-b59e-496cc19dbe4f",
    "name": "Bidón de 10kg",
    "abbreviation": "bidón 10kg",
    "isGlobal": true
  },
  {
    "id": "31620797-f410-4d02-adb4-58bddb981df1",
    "name": "Bidón de 20kg",
    "abbreviation": "bidón 20kg",
    "isGlobal": true
  },
  {
    "id": "cbbc3be7-780c-4a17-be97-8de881ef26dc",
    "name": "Bidón de 5kg",
    "abbreviation": "bidón 5kg",
    "isGlobal": true
  },
  {
    "id": "0b85ede6-97c3-4f7a-a775-aa79eab8b1a2",
    "name": "Bigalón",
    "abbreviation": "bigalon",
    "isGlobal": true
  },
  {
    "id": "206e9296-5509-43e8-855c-ec785480d463",
    "name": "Bolivianos",
    "abbreviation": "Bs",
    "isGlobal": true
  },
  {
    "id": "3a8b5484-ea45-462b-9072-4c86ff3509bd",
    "name": "Bolsa",
    "abbreviation": "bolsa",
    "isGlobal": true
  },
  {
    "id": "8f3dfbb1-1b61-4e71-a808-29cb102cfa6b",
    "name": "Bolsa 20kg",
    "abbreviation": "Bolsa 20kg",
    "isGlobal": true
  },
  {
    "id": "16adb233-9f5b-45f0-ad18-c473592d85df",
    "name": "Bolsa 3.5kg",
    "abbreviation": "bolsa 3.5 Kg",
    "isGlobal": true
  },
  {
    "id": "2e0e6277-473c-4626-a23c-416087758ca0",
    "name": "Bolsa 30kg",
    "abbreviation": "Bolsa 30kg",
    "isGlobal": true
  },
  {
    "id": "5956ec40-b2d0-4c74-b511-6e2df2299e79",
    "name": "Bolsa 45kg",
    "abbreviation": "Bolsa 45Kg",
    "isGlobal": true
  },
  {
    "id": "478bd8ff-b37e-4fe4-89ff-9e1919cde166",
    "name": "Bolsa 50kg",
    "abbreviation": "Bolsa 50kg",
    "isGlobal": true
  },
  {
    "id": "0efbf31d-0356-49f8-a38b-2de9a9f6d84e",
    "name": "Bolsa 5kg",
    "abbreviation": "Bolsa 5kg",
    "isGlobal": true
  },
  {
    "id": "6ad4989c-8657-4d36-88d4-0959e5b6d665",
    "name": "Caja",
    "abbreviation": "caja",
    "isGlobal": true
  },
  {
    "id": "8eda2891-ea62-4f88-b1ed-5b4ed33f7d4b",
    "name": "Cañería 4m",
    "abbreviation": "cañeria 4m",
    "isGlobal": true
  },
  {
    "id": "8c824a64-e1a3-4b6a-8016-90af4cc7b39a",
    "name": "Cañería 6m",
    "abbreviation": "cañeria 6m",
    "isGlobal": true
  },
  {
    "id": "a2630a31-233a-48b4-a436-db33e0b2d53e",
    "name": "Carreta",
    "abbreviation": "carreta",
    "isGlobal": true
  },
  {
    "id": "d7bb485a-ff46-4a0b-8888-4e830c009d59",
    "name": "Dia",
    "abbreviation": "día",
    "isGlobal": true
  },
  {
    "id": "e7a76a2a-b5b2-423a-8c71-166c6c97e386",
    "name": "Día",
    "abbreviation": "día",
    "isGlobal": true
  },
  {
    "id": "5a545d1e-c97a-4a77-9d89-a138af5ce55c",
    "name": "Docena",
    "abbreviation": "doc",
    "isGlobal": true
  },
  {
    "id": "9c025619-4481-47a8-ac3e-b0e0b85e45e1",
    "name": "Galón 3.60 litros",
    "abbreviation": "galón",
    "isGlobal": true
  },
  {
    "id": "a5dbd29d-ba03-4529-8293-93ef459b321f",
    "name": "Global",
    "abbreviation": "glb",
    "isGlobal": true
  },
  {
    "id": "e197b0ee-1b28-4440-8ae2-068e6313bf5b",
    "name": "Hoja",
    "abbreviation": "hoja",
    "isGlobal": true
  },
  {
    "id": "18aa0fde-fbb6-4ed2-9fb6-5fabf0a3fcb3",
    "name": "Hora",
    "abbreviation": "hr",
    "isGlobal": true
  },
  {
    "id": "7eeb6a6f-04ce-423a-bba8-818e379948ad",
    "name": "Jornal",
    "abbreviation": "jornal",
    "isGlobal": true
  },
  {
    "id": "0e354f3d-f4fc-499b-aace-95aeb35cb3f4",
    "name": "Juego",
    "abbreviation": "jgo",
    "isGlobal": true
  },
  {
    "id": "b54aaa9a-05c4-4aae-b3fa-81411e7db43a",
    "name": "Kilogramo",
    "abbreviation": "kg",
    "isGlobal": true
  },
  {
    "id": "0a998d19-dc36-49a7-b80a-8791f99bf74c",
    "name": "Lámina",
    "abbreviation": "lamina",
    "isGlobal": true
  },
  {
    "id": "629f2f81-a0bd-4ed3-b742-5fd011fa51a1",
    "name": "Lata",
    "abbreviation": "lata",
    "isGlobal": true
  },
  {
    "id": "7ef7358c-6b2d-46f3-ba61-0e5cd7d12b9e",
    "name": "Libra",
    "abbreviation": "lb",
    "isGlobal": true
  },
  {
    "id": "a22090ea-f718-4fb6-a610-2675ec5e9811",
    "name": "Litro",
    "abbreviation": "l",
    "isGlobal": true
  },
  {
    "id": "93bc78fd-063a-4b45-8af0-1cb9ca658a5d",
    "name": "Medio litro",
    "abbreviation": "500ml",
    "isGlobal": true
  },
  {
    "id": "3a60d197-bf81-44d9-8258-1d005309376a",
    "name": "Mes",
    "abbreviation": "mes",
    "isGlobal": true
  },
  {
    "id": "662c364c-7366-4858-b200-31fdf7dbd70d",
    "name": "Metro",
    "abbreviation": "m",
    "isGlobal": true
  },
  {
    "id": "9d6c7b6f-b517-4e05-ab66-60bf0262c15c",
    "name": "Metro cuadrado",
    "abbreviation": "m2",
    "isGlobal": true
  },
  {
    "id": "b7272c2f-3e48-42b1-896a-7a7f67c23258",
    "name": "Metro cúbico",
    "abbreviation": "m3",
    "isGlobal": true
  },
  {
    "id": "f8cf43e9-1e56-40bb-ac5e-4cbd910a4f44",
    "name": "Paquete",
    "abbreviation": "paq",
    "isGlobal": true
  },
  {
    "id": "5328bcf9-bc5c-4a8f-be04-16485be16902",
    "name": "Par",
    "abbreviation": "par",
    "isGlobal": true
  },
  {
    "id": "dc50fd9b-098b-469d-b4b5-ccffe5b99920",
    "name": "Pie2",
    "abbreviation": "p2",
    "isGlobal": true
  },
  {
    "id": "f1faee6c-fbef-4bfa-82af-301fdda435a0",
    "name": "Pieza",
    "abbreviation": "pza",
    "isGlobal": true
  },
  {
    "id": "e0fd6cb7-31f5-4ddc-a6f3-2a6d22ec80d7",
    "name": "Plancha",
    "abbreviation": "plancha",
    "isGlobal": true
  },
  {
    "id": "bf7700c9-3c6b-441d-8142-c30366a2a96b",
    "name": "Planchuela 6m",
    "abbreviation": "planchuela 6m",
    "isGlobal": true
  },
  {
    "id": "8012a8a3-40fb-416e-9a5c-5d9edd28e772",
    "name": "Porcentaje",
    "abbreviation": "%",
    "isGlobal": true
  },
  {
    "id": "8bdef7b4-b98a-462c-99b0-dddf91681b78",
    "name": "Punto",
    "abbreviation": "pto",
    "isGlobal": true
  },
  {
    "id": "84119164-015f-4a63-9439-b561a534730a",
    "name": "Rollo",
    "abbreviation": "rollo",
    "isGlobal": true
  },
  {
    "id": "26d3cca2-0aa6-49fc-92fe-16140d105d32",
    "name": "Rollo 100m",
    "abbreviation": "rollo 100m",
    "isGlobal": true
  },
  {
    "id": "eaf44db5-12e1-4091-b460-e315257801df",
    "name": "Rollo 10m",
    "abbreviation": "rollo 10m",
    "isGlobal": true
  },
  {
    "id": "c9344e5c-56df-4bea-8ce2-1ba08e107c5c",
    "name": "Rollo 20m",
    "abbreviation": "rollo 20m",
    "isGlobal": true
  },
  {
    "id": "276eaa6a-4be2-4b84-96f2-86fbb031df65",
    "name": "Rollo 40m",
    "abbreviation": "rollo 40m",
    "isGlobal": true
  },
  {
    "id": "a0accef7-e454-484f-b51d-24fcfdaa5f22",
    "name": "Tambor",
    "abbreviation": "tambor",
    "isGlobal": true
  },
  {
    "id": "bfa65285-0f08-4206-8bf3-da27f0bcaa55",
    "name": "Tonelada",
    "abbreviation": "tn",
    "isGlobal": true
  },
  {
    "id": "a844816c-9802-40e9-b1fd-bf220a07c09e",
    "name": "Tubo",
    "abbreviation": "tubo",
    "isGlobal": true
  },
  {
    "id": "61b439e3-1e5f-436b-8cce-8504da63ad5d",
    "name": "Turril",
    "abbreviation": "turril",
    "isGlobal": true
  },
  {
    "id": "3803b3e0-93b6-41af-b7e6-ceda84261f02",
    "name": "Unidad",
    "abbreviation": "und",
    "isGlobal": true
  },
  {
    "id": "c56de8d1-2a1c-46da-8f0b-11c19289a0df",
    "name": "Varilla",
    "abbreviation": "varilla",
    "isGlobal": true
  },
  {
    "id": "67025daf-14ed-4e6d-bdcd-6a22cdb2368a",
    "name": "Varilla 12m",
    "abbreviation": "varilla",
    "isGlobal": true
  },
  {
    "id": "8a1ea2d3-7c52-4818-a21b-d91a1230437c",
    "name": "Viaje",
    "abbreviation": "viaje",
    "isGlobal": true
  },
  {
    "id": "5c833797-9413-4ede-8b13-9f245a630090",
    "name": "Viaje 14m3",
    "abbreviation": "viaje 14m3",
    "isGlobal": true
  },
  {
    "id": "62d6f957-1173-41f9-88a3-dc23e816763a",
    "name": "Viaje 3m3",
    "abbreviation": "viaje 3m3",
    "isGlobal": true
  },
  {
    "id": "c61e501a-f17d-4f9c-8d8f-187fb0aad2ee",
    "name": "Viaje 5m3",
    "abbreviation": "viaje 5m3",
    "isGlobal": true
  },
  {
    "id": "3358a30b-be58-4f75-9502-a6a15be09b12",
    "name": "Viaje 6m3",
    "abbreviation": "viaje 6m3",
    "isGlobal": true
  },
  {
    "id": "aa830ddf-abe4-4825-ab02-9894470610c8",
    "name": "Viaje 7m3",
    "abbreviation": "viaje 7m3",
    "isGlobal": true
  },
  {
    "id": "c1459385-7e54-406a-96da-0777727c6127",
    "name": "Viaje visita a obra",
    "abbreviation": "viaje-obra",
    "isGlobal": true
  }
]




POST
/api/Units
Crea una nueva unidad de medida.

Enrada:

{
  "name": "borrar",
  "abbreviation": "br"
}


Salida:

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/Units' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "borrar",
  "abbreviation": "br"
}'



PUT
/api/Units/{id}
Actualiza una unidad de medida existente.

Entrada:

Name	Description
id *
string($uuid)
(path)
ID de la unidad.

20258edf-4edb-4905-83cb-e99114e60682


{
  "id": "20258edf-4edb-4905-83cb-e99114e60682",
  "name": "string",
  "abbreviation": "string"
}


Salida:

curl -X 'PUT' \
  'https://localhost:7149/api/construction/api/Units/20258edf-4edb-4905-83cb-e99114e60682' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "20258edf-4edb-4905-83cb-e99114e60682",
  "name": "string",
  "abbreviation": "string"
}'




DELETE
/api/Units/{id}
Elimina (Soft Delete) una unidad de medida.

Entrada:

Name	Description
id *
string($uuid)
(path)
ID de la unidad.

20258edf-4edb-4905-83cb-e99114e60682


Salida:

curl -X 'DELETE' \
  'https://localhost:7149/api/construction/api/Units/20258edf-4edb-4905-83cb-e99114e60682' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk'



Projects


GET
/api/Projects
Obtiene la lista de proyectos visibles para el usuario.

Name	Description
status
string
(query)
Filtro opcional por estado (0=Draft, 1=InProgress, etc.).

Darft
InProgress
Completed
OnHold

Salida:

[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "code": "string",
    "location": "string",
    "client": "string",
    "exchangeRate": 0,
    "totalAmount": 0,
    "description": "string",
    "startDate": "2026-03-06T19:28:43.600Z",
    "endDate": "2026-03-06T19:28:43.600Z",
    "status": "Draft",
    "membersCount": 0
  }
]


POST
/api/Projects
Crea un nuevo proyecto.

Entrada:

{
  "name": "Victor",
  "code": "xx11223",
  "location": "Tarija,bolivia",
  "client": "Gestora",
  "exchangeRate": 0,
  "description": "Este es mi proyecto de ejemplo",
  "startDate": "2026-03-06T19:29:14.815Z"
}

Salida:
curl -X 'POST' \
  'https://localhost:7149/api/construction/api/Projects' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Victor",
  "code": "xx11223",
  "location": "Tarija,bolivia",
  "client": "Gestora",
  "exchangeRate": 0,
  "description": "Este es mi proyecto de ejemplo",
  "startDate": "2026-03-06T19:29:14.815Z"
}'



PUT
/api/Projects/{id}

Entrada:

Actualiza la información de un proyecto.

Name	Description
id *
string($uuid)
(path)
ID del proyecto.

2dbcd02f-729f-4e34-afb2-91eade55ca50

{
  "id": "2dbcd02f-729f-4e34-afb2-91eade55ca50",
  "name": "VictorH",
  "location": "Tarija City",
  "client": "GEstora Alcalde",
  "exchangeRate": 0,
  "description": "Este es mi proyecto de ejemplo",
  "startDate": "2026-03-06T19:30:48.583Z",
  "endDate": "2026-03-06T19:30:48.583Z",
  "status": "Draft"
}


Salida:

curl -X 'PUT' \
  'https://localhost:7149/api/construction/api/Projects/2dbcd02f-729f-4e34-afb2-91eade55ca50' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "2dbcd02f-729f-4e34-afb2-91eade55ca50",
  "name": "VictorH",
  "location": "Tarija City",
  "client": "GEstora Alcalde",
  "exchangeRate": 0,
  "description": "Este es mi proyecto de ejemplo",
  "startDate": "2026-03-06T19:30:48.583Z",
  "endDate": "2026-03-06T19:30:48.583Z",
  "status": "Draft"
}'


DELETE
/api/Projects/{id}
Elimina (Soft Delete) un proyecto.

Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
ID del proyecto.

id




ProjectParameters


GET
/api/projects/{projectId}/parameters
Obtiene los parámetros de cálculo de un proyecto específico.

Entrada:

Name	Description
projectId *
string($uuid)
(path)
ID del proyecto.

2dbcd02f-729f-4e34-afb2-91eade55ca50


Salida:
	
Response body
Download
{
  "socialBenefitsPercentage": 55,
  "laborIVAPercentage": 14.94,
  "isLaborIVAActive": true,
  "minorToolsPercentage": 5,
  "generalExpensesPercentage": 10,
  "utilityPercentage": 10,
  "itPercentage": 3.09,
  "isITActive": true
}


PUT
/api/projects/{projectId}/parameters
Entrada:

Actualiza los parámetros de cálculo de un proyecto.

Name	Description
projectId *
string($uuid)
(path)
ID del proyecto.

2dbcd02f-729f-4e34-afb2-91eade55ca50

{
  "socialBenefitsPercentage": 0,
  "laborIVAPercentage": 0,
  "isLaborIVAActive": true,
  "minorToolsPercentage": 0,
  "generalExpensesPercentage": 0,
  "utilityPercentage": 0,
  "itPercentage": 0,
  "isITActive": true
}

Salida:

curl -X 'PUT' \
  'https://localhost:7149/api/construction/api/projects/2dbcd02f-729f-4e34-afb2-91eade55ca50/parameters' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "socialBenefitsPercentage": 0,
  "laborIVAPercentage": 0,
  "isLaborIVAActive": true,
  "minorToolsPercentage": 0,
  "generalExpensesPercentage": 0,
  "utilityPercentage": 0,
  "itPercentage": 0,
  "isITActive": true
}'


GET
/api/settings/global-parameters
Obtiene los parámetros globales por defecto del sistema.

{
  "socialBenefitsPercentage": 55,
  "laborIVAPercentage": 14.94,
  "isLaborIVAActive": true,
  "minorToolsPercentage": 5,
  "generalExpensesPercentage": 10,
  "utilityPercentage": 10,
  "itPercentage": 3.09,
  "isITActive": true
}


Modules


GET
/api/projects/{projectId}/modules
Obtiene la lista plana de módulos de un proyecto.

Entrada: (Name	Description
projectId *
string($uuid)
(path)
ID del proyecto.

2dbcd02f-729f-4e34-afb2-91eade55ca50
)

Salida: (
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "totalAmount": 0,
    "order": 0
  }
]
)



POST
/api/projects/{projectId}/modules
Crea un módulo en un proyecto.

Entrada:

Name	Description
projectId *
string($uuid)
(path)
ID del proyecto.

2dbcd02f-729f-4e34-afb2-91eade55ca50


{
  "projectId": "2dbcd02f-729f-4e34-afb2-91eade55ca50",
  "name": "modulo test",
  "description": "Esto es un test",
  "order": 0
}


Salida:

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/projects/2dbcd02f-729f-4e34-afb2-91eade55ca50/modules' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "projectId": "2dbcd02f-729f-4e34-afb2-91eade55ca50",
  "name": "modulo test",
  "description": "Esto es un test",
  "order": 0
}'



PUT
/api/modules/{id}

Entrada:

Actualiza un módulo existente.

Name	Description
id *
string($uuid)
(path)
ID del módulo.

c5358642-3cba-421b-8074-0aa2eb1eeb93


{
  "id": "c5358642-3cba-421b-8074-0aa2eb1eeb93",
  "name": "Esto es un UPdate test test test test",
  "description": "Esto es un test",
  "order": 0
}


Salida:

curl -X 'PUT' \
  'https://localhost:7149/api/construction/api/modules/c5358642-3cba-421b-8074-0aa2eb1eeb93' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "c5358642-3cba-421b-8074-0aa2eb1eeb93",
  "name": "Esto es un UPdate test test test test",
  "description": "Esto es un test",
  "order": 0
}'

DELETE
/api/modules/{id}
Elimina un módulo y sus ítems asociados.


Entrada: 

Name	Description
id *
string($uuid)
(path)
ID del módulo a borrar.




ItemTemplates


GET
/api/ItemTemplates
Obtiene el catálogo de ítems maestros (plantillas).

Entrada:

Parameters
Cancel
Name	Description
onlyMyTenant
boolean
(query)
Si es true, excluye los ítems globales.


false, true

Salida:

[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "code": "string",
    "unit": "string",
    "description": "string",
    "isGlobal": true,
    "resourceCount": 0
  }
]



POST
/api/ItemTemplates
Crea un nuevo ítem maestro (solo cabecera).

Entrada:
{
  "name": "new item",
  "code": "eeeeegggg",
  "description": "esto es el new item",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081"
}

Salida:(

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/ItemTemplates' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "new item",
  "code": "eeeeegggg",
  "description": "esto es el new item",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081"
}'

)




PUT
/api/ItemTemplates/{id}

Entrada:

Actualiza la cabecera de un ítem maestro.

Name	Description
id *
string($uuid)
(path)
ID del ítem.

7446c8e3-b1f0-4823-bd83-5f4b9ec8c924


{
  "id": "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924",
  "name": "Esto es un UPDATE",
  "code": "DDDDDD",
  "description": "DDDDDDDDDDDD",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081"
}

Salida:

curl -X 'PUT' \
  'https://localhost:7149/api/construction/api/ItemTemplates/7446c8e3-b1f0-4823-bd83-5f4b9ec8c924' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924",
  "name": "Esto es un UPDATE",
  "code": "DDDDDD",
  "description": "DDDDDDDDDDDD",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081"
}'


DELETE
/api/ItemTemplates/{id}
Elimina (Soft Delete) un ítem maestro y todos sus recursos asociados.

Name	Description
id *
string($uuid)
(path)
ID del ítem.



POST
/api/ItemTemplates/{id}/resources
Agrega o actualiza recursos (ingredientes) al ítem maestro.

[
  {
    "resourceId": "f0ad0358-45a5-462c-9edc-1896874e62dc",
    "quantity": 0
  }
]

DELETE
/api/ItemTemplates/{id}/resources
Elimina recursos específicos del ítem maestro.

entrada:
Name	Description
id *
string($uuid)
(path)
ID del ItemTemplate.

7446c8e3-b1f0-4823-bd83-5f4b9ec8c924


Salida:

curl -X 'DELETE' \
  'https://localhost:7149/api/construction/api/ItemTemplates/7446c8e3-b1f0-4823-bd83-5f4b9ec8c924/resources' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWExNzJiOS05MTFiLTQ0YzUtYjZmNC0xOTEzOGUyZWZkOTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3MjgyNzM1MSwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.YOa42wfWVcCa1b9OVgm9MQrDrUtVRwRKMMmb6wD0Crk' \
  -H 'Content-Type: application/json' \
  -d '[
  "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924"
]'


BudgetItems


GET
/api/items/{id}/analysis
Obtiene el análisis de precio unitario (APU) detallado de un ítem.

Name	Description
id *
string($uuid)
(path)
ID del ítem de presupuesto.


salida:

{
  "budgetItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "itemName": "string",
  "totalMaterials": 0,
  "materials": [
    {
      "name": "string",
      "unit": "string",
      "performance": 0,
      "unitPrice": 0,
      "total": 0
    }
  ],
  "laborSubtotal": 0,
  "socialBenefits": 0,
  "laborIVA": 0,
  "totalLabor": 0,
  "labor": [
    {
      "name": "string",
      "unit": "string",
      "performance": 0,
      "unitPrice": 0,
      "total": 0
    }
  ],
  "equipmentSubtotal": 0,
  "minorTools": 0,
  "totalEquipment": 0,
  "equipment": [
    {
      "name": "string",
      "unit": "string",
      "performance": 0,
      "unitPrice": 0,
      "total": 0
    }
  ],
  "generalExpenses": 0,
  "utility": 0,
  "taxIT": 0,
  "finalUnitPrice": 0
}



GET
/api/modules/{moduleId}/items
Obtiene todos los ítems de presupuesto (APUs) de un módulo.
entrada:

Name	Description
moduleId *
string($uuid)
(path)
ID del módulo padre.

2dbcd02f-729f-4e34-afb2-91eade55ca50

Salida:

[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "unit": "string",
    "quantity": 0,
    "unitPrice": 0,
    "code": "string",
    "projectModuleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "total": 0,
    "materialCost": 0,
    "laborCost": 0,
    "equipmentCost": 0
  }
]

POST
/api/modules/{moduleId}/items
Crea un nuevo ítem de presupuesto vacío en un módulo.
entrada:
moduleId *
string($uuid)
(path)
ID del módulo padre.

ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78


{
  "moduleId": "ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78",
  "name": "string",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "quantity": 0
}


Salida:

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/modules/ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78/items' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzAwY2FjOC05ZGMxLTQxMzAtYWIzNC0yYWYyYThlZTY4ODIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3Mjg0ODg5OCwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.Q46c4rgICaA5hYvYkCOu_oOrY8OsbVGONG-_nIaBxOY' \
  -H 'Content-Type: application/json' \
  -d '{
  "moduleId": "ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78",
  "name": "string",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "quantity": 0
}'

POST
/api/modules/{moduleId}/items/import
Importa (clona) una lista de ítems desde el Catálogo Maestro al Proyecto.

Entrada:

Name	Description
moduleId *
string($uuid)
(path)
ID del módulo destino.

ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78


{
  "moduleId": "ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78",
  "items": [
    {
      "templateId": "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924",
      "quantity": 0
    }
  ]
}


Salida:

curl -X 'POST' \
  'https://localhost:7149/api/construction/api/modules/ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78/items/import' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzAwY2FjOC05ZGMxLTQxMzAtYWIzNC0yYWYyYThlZTY4ODIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImtLZGJtWmFGNW9nUTBlUDdYZ1F4bmdBQlR4ZTIiLCJlbWFpbCI6ImVtcHJlc2FAZ2FtYS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFbXByZXNhIiwidXNlcl90eXBlIjoiRW1wcmVzYSIsIm1vZHVsZSI6IkNvbnN0cnVjY2lvbiIsImV4cCI6MTc3Mjg0ODg5OCwiaXNzIjoiVXNlck1hbmFnZW1lbnQuQVBJIiwiYXVkIjoiVXNlck1hbmFnZW1lbnQuQ2xpZW50In0.Q46c4rgICaA5hYvYkCOu_oOrY8OsbVGONG-_nIaBxOY' \
  -H 'Content-Type: application/json' \
  -d '{
  "moduleId": "ac8807a7-45fd-4ed4-bc7f-a1b1a0b69e78",
  "items": [
    {
      "templateId": "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924",
      "quantity": 0
    }
  ]
}'


PUT
/api/items/{id}
Actualiza la cabecera de un ítem de presupuesto (Nombre, Cantidad, Código, Unidad).

Entrada:

Name	Description
id *
string($uuid)
(path)
ID del ítem.


{
  "id": "7446c8e3-b1f0-4823-bd83-5f4b9ec8c924",
  "name": "string",
  "unitOfMeasureId": "a082bf62-0b46-4ea4-ac60-b4369fe3f081",
  "quantity": 0,
  "code": "string"
}


DELETE
/api/items/{id}
Elimina (Soft Delete) un ítem de presupuesto completo y sus recursos.

id *
string($uuid)
(path)
ID del ítem.



POST
/api/items/{id}/resources/custom
Agrega un recurso personalizado (manual) a un ítem de presupuesto.

Entrada:

id *
string($uuid)
(path)
ID del ítem de presupuesto.


{
  "budgetItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "unitOfMeasureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "unitPrice": 0,
  "performance": 0,
  "quantity": 0,
  "type": "Materiales"
}



PUT
/api/items/{id}/resources/{resourceId}
Actualiza un recurso específico dentro de un ítem de obra.

Entrada:

Name	Description
id *
string($uuid)
(path)
ID del ítem de obra.

id
resourceId *
string($uuid)
(path)
ID del recurso a editar.


{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "unitOfMeasureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "unitPrice": 0,
  "performance": 0,
  "quantity": 0,
  "type": "Materiales"
}




DELETE
/api/items/{id}/resources/{resourceId}
Elimina un recurso específico de un ítem de presupuesto.

Name	Description
id *
string($uuid)
(path)
ID del ítem padre (solo para ruta).

id
resourceId *
string($uuid)
(path)
ID del recurso a eliminar.

resourceId
