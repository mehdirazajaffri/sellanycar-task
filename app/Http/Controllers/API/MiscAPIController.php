<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateCropAPIRequest;
use App\Http\Requests\API\UpdateCropAPIRequest;
use App\Models\Crop;
use App\Repositories\CropRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Repositories\FieldRepository;
use Response;

/**
 * Class CropController
 * @package App\Http\Controllers\API
 */

class MiscAPIController extends AppBaseController
{

    private $fieldRepository;

    public function __construct(FieldRepository $fieldRepo)
    {
        $this->fieldRepository = $fieldRepo;
    }

    public function getProcessedAreaStats(Request $request){

        $result = $this->fieldRepository->getFieldsStats();
        return $this->sendResponse($result, 'retrieved successfully');

    }

}
