# Tittle
TEST/ASSIGNMENT Vrillar Interview

# Require
- Docker (for MongoDb Database)
- TypeScript

# Description
Server has running on port 3000 with 2 apis:
- One for crawler data of Race from 2010-2023 from formula1.com, write to file './data/race.json' if not exists (for the next time, we not need to call request to crawler again), then insert to DB
- Another for search race with mutiple filter option

# Instruction 
- Step 1: run 'bash script/run.sh' to run server
- Step 2: call Crawler Api with endpoint below to prepare data to search
- Step 3: use Search Race Api below with your filter which you want

# Crawler Api
- Endpoint: http://localhost:3000/api/crawler/race
- Method: POST

# Search Api
- Endpoint: http://localhost:3000/api/race/search
- Method: GET
- Params:
    - yearFrom: number
    - yearTo: number
    - grandFix: string
    - dateFrom: string
    - dateTo: string
    - winner: string
    - car: string
    - lapsFrom: number
    - lapsTo: number
    - sortBy: string ### Field need to sort, default 'year', optional ['year', 'grandFix', 'winner', 'laps']
    - sortType: string ### Type sort, default 'desc', optional 'asc' || 'desc'
    - page: number
    - limit: number

# Example
curl --location 'http://localhost:3000/api/race/search?yearFrom=2010&yearTo=2012&grandFix=bahrain&car=Ferrari&lapsFrom=48&lapsTo=56&winner=Alonso&dateFrom=2021-09-24&dateTo=2022-09-26&page=1&limit=5&sortBy=laps&sortType=desc'