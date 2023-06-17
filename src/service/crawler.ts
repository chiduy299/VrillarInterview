const cheerio = require('cheerio');
import axios from 'axios';
import * as fs from "fs";
import { HttpException } from '../core/exceptions';
import IRace, { RaceSchema } from '../storage/mongodb/race';

class CrawlerService {
    public async crawlerAndInsertDataRace() {
        try {
            var listRaceByYear: Array<object> = [];

            // check file race.json exists or not
            // if exists -> read data from file
            // if not exist -> call crawler from formula1.com, write to file data/race.json for the next time not to call again
            // insert to database
            if (fs.existsSync('./data/race.json')) {
                console.info("Race.json exists !")
                let dataRead = fs.readFileSync('./data/race.json', 'utf-8');
                listRaceByYear = JSON.parse(dataRead) as Array<object>;
            } else {
                console.info("Race.json not exist --> Crawling from formula1.com...")
                listRaceByYear = await this.crawlerDataRaceResult();
            }

            // drop collection to insert data new
            await RaceSchema.collection.drop();

            RaceSchema.insertMany(listRaceByYear).then(function(){
                console.info("Data imported success")  // Success
                return;
            }).catch(function(error){
                console.error(error)      // Failure
                throw new HttpException(400, -1, "Import mongodb race data failed")
            });

        } catch (error) {
            console.error(error);
            throw new HttpException(400, -2, "Unexpected Error")
        }
    }

    private generateUrlResult(year: number, object: string): string {
        return `https://www.formula1.com/en/results.html/${year}/${object}.html`;
    }

    // function to prepare crawler data result - scoreboard by year from 2010 -> 2023
    // write to data/race.json
    private async crawlerDataRaceResult(): Promise<Array<object>> {
        var listYearCrawler = [2010, 2011, 2012, 2013 , 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
        var result: Array<{[k: string]: any}> = [];

        for (var year of listYearCrawler) {
            let url = this.generateUrlResult(year, "races");
            try {
                const response = await axios.get(url);
            
                const html = response.data;
                const $ = cheerio.load(html); // load HTML
                $('.resultsarchive-table tbody tr').each((index: any, el: any) => { // lặp từng phần tử có class là listing-item--link
                    const statValue = $(el).find('td').text(); // get name stat in class 'stat-value'
                    let list: Array<string> = statValue.split('\n');

                    var object: {[k: string]: any} = {};
                    var count = 0;
                    var vecValue: Array<string> = [];

                    for (index in list) {
                        let valueTrim: string = list[index].trim();
                        if (valueTrim != '') {
                            vecValue.push(valueTrim);
                            count++;
                        }
                    }
                    object["year"] = year;
                    object["grand_fix"] = vecValue[0];

                    var date = new Date(vecValue[1]);
                    object["date"] = date.toLocaleDateString();

                    object["winner"] = vecValue[2] +" "+ vecValue[3];
                    object["time"] = vecValue[5].slice(vecValue[5].length - 11, vecValue[5].length);
                    
                    let car_and_laps = vecValue[5].slice(0, vecValue[5].length - 11);
                    const fristNumberIndex = car_and_laps.search(/\d/);
                    object["car"] = car_and_laps.slice(0, fristNumberIndex);
                    object["laps"] = Number(car_and_laps.slice(fristNumberIndex, car_and_laps.length));

                    result.push(object);
                })

                } catch (error) {
                if (error instanceof Error) {
                    throw new HttpException(400, -1, error.message)
                } else {
                    throw new HttpException(400, -2, "Unexpected Error")
                }
            }
        }

        // writing the JSON string content to a file
        fs.writeFile("./data/race.json", JSON.stringify(result), (error) => {
            // throwing the error
            // in case of a writing problem
            if (error) {
                // logging the error
                console.error("Write race.json error ", error);
            } else {
                console.log("Write race.json successfully!");
            }
        });

        return result as Array<object>;
    }
}

export default CrawlerService;