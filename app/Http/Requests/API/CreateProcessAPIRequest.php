<?php

namespace App\Http\Requests\API;

use App\Models\Process;
use App\Http\Requests\APIRequest;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;

class CreateProcessAPIRequest extends APIRequest
{

    // public function __construct(ValidationFactory $validationFactory)
    // {

    //     $validationFactory->extend(
    //         'processing_area',
    //         function ($attribute, $value, $parameters) {
    //             var_dump($attribute);
    //             var_dump($parameters);
    //             return 'processing_area' === $value;
    //         },
    //         'Sorry, it failed processing area validation!, the processing area must be less than the'
    //     );

    // }


    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Process::$rules;
    }
}
