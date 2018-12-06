import Vue from "vue";
import Http from "vue-resource";
import {stringify} from "querystring";

type HttpOptions = Http.HttpOptions;
type HttpResponse = Http.HttpResponse;


const V = Vue as any;

interface GeneralMutateRequest<TBody = void, TParams = {}> {
    params?: TParams;
    body: TBody;
}

let link = 'http://localhost:3000/api/v1/sign_in';

//type Response<T = {}> = Promise<CommonResponse<T>>;

class ApiService {

   public trying() {
       return V.http.post(link, {"email": "admin@journal.com", "password": "12345678"}).then(function(response){
           console.log(response);
       }, function(error){
           console.log(error.statusText);
       });
   }


    // private get(url: string, request?: HttpOptions) {
    //     return V.http
    //         .get(url, request)
    //         .then((response: HttpResponse) => response.json())
    //         .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    // }
    // private post(
    //     url: string,
    //     body: any,
    //     parseJson = true,
    //     request?: HttpOptions
    // ) {
    //     return V.http
    //         .post(url, body, request)
    //         .then(
    //             (response: HttpResponse) =>
    //                 parseJson ? response.json() : response.text()
    //         )
    //         .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    // }
    //
    // private delete(url: string, request?: HttpOptions) {
    //     return V.http
    //         .delete(url, request)
    //         .then((response: HttpResponse) => response.json())
    //         .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    // }
}

export default new ApiService();
