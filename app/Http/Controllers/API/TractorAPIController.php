<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTractorAPIRequest;
use App\Http\Requests\API\UpdateTractorAPIRequest;
use App\Models\Tractor;
use App\Repositories\TractorRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class TractorController
 * @package App\Http\Controllers\API
 */

class TractorAPIController extends AppBaseController
{
    /** @var  TractorRepository */
    private $tractorRepository;

    public function __construct(TractorRepository $tractorRepo)
    {
        $this->tractorRepository = $tractorRepo;
    }

    /**
     * Display a listing of the Tractor.
     * GET|HEAD /tractors
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $tractors = $this->tractorRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($tractors->toArray(), 'Tractors retrieved successfully');
    }

    /**
     * Store a newly created Tractor in storage.
     * POST /tractors
     *
     * @param CreateTractorAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateTractorAPIRequest $request)
    {
        $input = $request->all();

        $tractor = $this->tractorRepository->create($input);

        return $this->sendResponse($tractor->toArray(), 'Tractor saved successfully');
    }

    /**
     * Display the specified Tractor.
     * GET|HEAD /tractors/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Tractor $tractor */
        $tractor = $this->tractorRepository->find($id);

        if (empty($tractor)) {
            return $this->sendError('Tractor not found');
        }

        return $this->sendResponse($tractor->toArray(), 'Tractor retrieved successfully');
    }

    /**
     * Update the specified Tractor in storage.
     * PUT/PATCH /tractors/{id}
     *
     * @param int $id
     * @param UpdateTractorAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateTractorAPIRequest $request)
    {
        $input = $request->all();

        /** @var Tractor $tractor */
        $tractor = $this->tractorRepository->find($id);

        if (empty($tractor)) {
            return $this->sendError('Tractor not found');
        }

        $tractor = $this->tractorRepository->update($input, $id);

        return $this->sendResponse($tractor->toArray(), 'Tractor updated successfully');
    }

    /**
     * Remove the specified Tractor from storage.
     * DELETE /tractors/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Tractor $tractor */
        $tractor = $this->tractorRepository->find($id);

        if (empty($tractor)) {
            return $this->sendError('Tractor not found');
        }

        $tractor->delete();

        return $this->sendSuccess('Tractor deleted successfully');
    }
}
