import { HttpException } from '../core/exceptions';
import SearchRaceDto from '../protocol/http/dtos/race/searchRace';
import IRace, { RaceSchema } from '../storage/mongodb/race';
import moment from 'moment';

class RaceService {
    public async searchRace(filter: SearchRaceDto): Promise<object> {
        let query: {[k: string]: any} = {};

        let yearQuery: {[k: string]: any} = {};
        if (filter.yearFrom) yearQuery["$gte"] = filter.yearFrom;
        if (filter.yearTo) yearQuery["$lte"] = filter.yearTo;
        if (Object.keys(yearQuery).length != 0) query["year"] = yearQuery;

        let lapsQuery: {[k: string]: any} = {};
        if (filter.lapsFrom) lapsQuery["$gte"] = filter.lapsFrom;
        if (filter.lapsTo) lapsQuery["$lte"] = filter.lapsTo;
        if (Object.keys(lapsQuery).length != 0) query["laps"] = lapsQuery;

        let dateQuery: {[k: string]: any} = {};
        if (filter.dateFrom) {  
            if (moment(filter.dateFrom, "YYYY-MM-DD", true).isValid()) {
                dateQuery["$gte"] = new Date(filter.dateFrom);
            } else {
                throw new HttpException(400, -4, "Invalid filter dateFrom, must be formated in YYYY-MM-DD");
            }
        };
        if (filter.dateTo) {
            if (moment(filter.dateTo, "YYYY-MM-DD", true).isValid()) {
                dateQuery["$lte"] = new Date(filter.dateTo);
            } else {
                throw new HttpException(400, -4, "Invalid filter dateTo, must be formated in YYYY-MM-DD");
            }
        }
        if (Object.keys(dateQuery).length != 0) query["date"] = dateQuery;

        if (filter.grandFix) query["grandFix"] = { $regex: filter.grandFix, $options: 'i' };
        if (filter.car) query["car"] = { $regex: filter.car, $options: 'i' };
        if (filter.winner) query["winner"] = { $regex: filter.winner, $options: 'i' };

        let limit = filter.limit ? filter.limit : 20;
        let page = filter.page ? filter.page : 1;

        let sortQuery: {[k: string]: any} = {};

        if (filter.sortBy) {
            if (!['year', 'grandFix', 'winner', 'laps'].includes(filter.sortBy)) {
                throw new HttpException(400, -5, "Invalid sortBy, must in ['year','grandFix','winner','laps']");
            }
            if (filter.sortType) {
                if (filter.sortType.toLowerCase() == "asc") {
                    sortQuery[filter.sortBy] = 1;
                } else if (filter.sortType.toLowerCase() == "desc") {
                    sortQuery[filter.sortBy] = -1;
                } else {
                    throw new HttpException(400, -5, "Invalid sortType, must be 'asc' or 'desc'");
                }
            } else {
                sortQuery[filter.sortBy] = 1;
            }
        } else {
            sortQuery["year"] = -1;
        }

        try {
            let races: Array<IRace> = await RaceSchema.find(query)
            .sort(sortQuery)
            .limit(limit)
            .skip(limit * (page - 1))
            .exec();

            let countTotal = await RaceSchema.count(query);

            return {
                total: countTotal,
                totalPage: Math.ceil(countTotal / limit),
                page: Number(page),
                limit: Number(limit),
                list: races,
            };
        } catch (error) {
            console.log(error)
            throw new HttpException(400, -3, "Error when searching race");
        }
    }

}

export default RaceService;