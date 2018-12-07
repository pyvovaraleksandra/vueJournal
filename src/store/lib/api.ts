import Vue from "vue";
const V = Vue as any;
import Http from "vue-resource";
import { stringify } from "querystring";

type HttpOptions = Http.HttpOptions;
type HttpResponse = Http.HttpResponse;

let host = 'http://localhost:3000/api';

type Response<T = {}> = Promise<CommonResponse<T>>;

interface GeneralMutateRequest<TBody = void, TParams = {}> {
    params?: TParams;
    body: TBody;
}

class ApiService {

    public postSignIn({ body }: GeneralMutateRequest<SignInRequest>):Response<SignInResponse> {
        return this.post(`/v1/sign_in`, body);
    }


    // private get(url: string, request?: HttpOptions) {
    //     return V.http
    //         .get(url, request)
    //         .then((response: HttpResponse) => response.json())
    //         .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    // }

    private post(
        url: string,
        body: any,
        parseJson = true,
        request?: HttpOptions
    ) {
        return V.http
            .post(`${host}${url}`, body, request)
            .then(
                (response: HttpResponse) =>
                    parseJson ? response.json() : response.text()
            )
            .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    }
    //
    // private delete(url: string, request?: HttpOptions) {
    //     return V.http
    //         .delete(url, request)
    //         .then((response: HttpResponse) => response.json())
    //         .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    // }
}

export default new ApiService();
