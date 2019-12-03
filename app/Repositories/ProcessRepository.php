<?php

namespace App\Repositories;

use App\Exceptions\AreaException;
use App\Exceptions\AreaOutOfRangeException;
use App\Models\Field;
use App\Models\Process;
use App\Repositories\BaseRepository;
use App\Utils\HelperUtil;
use Illuminate\Validation\ValidationException;

/**
 * Class ProcessRepository
 * @package App\Repositories
 * @version December 1, 2019, 8:13 pm UTC
 */

class ProcessRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'tractor_id',
        'field_id',
        'date',
        'area'
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Process::class;
    }


    public function create($input)
    {
        $process = new Process();
        $fields = new Field();

        // Calculate Processed Area
        $processes = $process->where("field_id", $input["field_id"])->get()->toArray();

        $curenntProcessedArea = HelperUtil::calculateSum($processes);

        // Find the Field

        $field = $fields->find($input["field_id"]);


        $difference = $field->area - $curenntProcessedArea;

        if ($field->area >= $input["area"]) {
            if ($difference < $input["area"]) {
                throw new AreaException("Most of the Area is Already Processed");
            }
        } else {
            throw new AreaOutOfRangeException("Area should be less than the field Area");
        }

        // Save Data
        $process = $process->newInstance($input);
        $process->save();

        return $process;
    }
}
