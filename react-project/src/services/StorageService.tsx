class StorageService {
    static getLastSearchRequestParams = () : string => {
        return localStorage.getItem('search_params') ?? '';
    }

    static saveSearchRequestParams = (params: string) => {
        localStorage.setItem('search_params', params);
    }
}

export default StorageService;
