<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use App\Utils\ResponseUtil;
use Response;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class APIRequest extends FormRequest
{
    /**
     * Get the proper failed validation response for the request.
     *
     * @param array $errors
     *
     * @return Response
     */
    public function response(array $errors)
    {
        $messages = implode(' ', Arr::flatten($errors));

        return Response::json(ResponseUtil::makeError($messages), 400);
    }


    /**
     * Failed validation disable redirect
     *
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json(ResponseUtil::makeError("Validation Error",array($validator->errors())) , 422));
    }
}
