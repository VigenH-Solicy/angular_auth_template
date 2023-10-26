export interface IResponse<T> {
    data: IResponseData<T>;
}

interface IResponseData<T> {
    code: number,
    data: T,
    message: string
}
