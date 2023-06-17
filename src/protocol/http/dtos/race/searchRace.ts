
export default interface SearchRaceDto {
    yearFrom?: number;
    yearTo?: number;
    grandFix?: string;
    dateFrom?: string;
    dateTo?: string;
    winner?: string;
    car?: string;
    lapsFrom?: number;
    lapsTo?: number;
    sortBy?: string;
    sortType?: string;
    page?: number;
    limit?: number;
}