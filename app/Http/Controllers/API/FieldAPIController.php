<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateFieldAPIRequest;
use App\Http\Requests\API\UpdateFieldAPIRequest;
use App\Models\Field;
use App\Repositories\FieldRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class FieldController
 * @package App\Http\Controllers\API
 */

class FieldAPIController extends AppBaseController
{
    /** @var  FieldRepository */
    private $fieldRepository;

    public function __construct(FieldRepository $fieldRepo)
    {
        $this->fieldRepository = $fieldRepo;
    }

    /**
     *
     *  *  * @OA\Get(
     *      path="/api/fields",
     *      operationId="getAllFields",
     *      tags={"Fields"},
     *      summary="Get list of Fields",
     *      description="Returns list of Fields",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     *     )
     *
     * Returns list of Fields
     *
     *
     * Display a listing of the Field.
     * GET|HEAD /fields
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $fields = $this->fieldRepository->withRelations(['crop'])->get();

        return $this->sendResponse($fields->toArray(), 'Fields retrieved successfully');
    }

    /**
     *
     *  *  * @OA\Get(
     *      path="/api/fields-data",
     *      operationId="getAllFieldsWithProcessData",
     *      tags={"Fields"},
     *      summary="Get list of Fields",
     *      description="Returns list of Fields",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     *     )
     *
     * Returns list of Fields
     *
     *
     * Display a listing of the Field.
     * GET|HEAD /fields
     *
     * @param Request $request
     * @return Response
     */
    public function getAllDetails(Request $request)
    {
        $fields = $this->fieldRepository->getFieldsWithAlldata();

        return $this->sendResponse($fields, 'Fields retrieved successfully');
    }

    /**
     * Store a newly created Field in storage.
     * POST /fields
     *
     * @param CreateFieldAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateFieldAPIRequest $request)
    {
        $input = $request->all();

        $field = $this->fieldRepository->create($input);

        return $this->sendResponse($field->toArray(), 'Field saved successfully');
    }

    /**
     * Display the specified Field.
     * GET|HEAD /fields/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Field $field */
        $field = $this->fieldRepository->find($id);

        if (empty($field)) {
            return $this->sendError('Field not found');
        }

        return $this->sendResponse($field->toArray(), 'Field retrieved successfully');
    }

    /**
     * Update the specified Field in storage.
     * PUT/PATCH /fields/{id}
     *
     * @param int $id
     * @param UpdateFieldAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateFieldAPIRequest $request)
    {
        $input = $request->all();

        /** @var Field $field */
        $field = $this->fieldRepository->find($id);

        if (empty($field)) {
            return $this->sendError('Field not found');
        }

        $field = $this->fieldRepository->update($input, $id);

        return $this->sendResponse($field->toArray(), 'Field updated successfully');
    }

    /**
     * Remove the specified Field from storage.
     * DELETE /fields/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Field $field */
        $field = $this->fieldRepository->find($id);

        if (empty($field)) {
            return $this->sendError('Field not found');
        }

        $field->delete();

        return $this->sendSuccess('Field deleted successfully');
    }
}
