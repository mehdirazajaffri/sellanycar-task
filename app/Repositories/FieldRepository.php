<?php

namespace App\Repositories;

use App\Models\Field;
use App\Repositories\BaseRepository;
use App\Utils\HelperUtil;

/**
 * Class FieldRepository
 * @package App\Repositories
 * @version December 1, 2019, 8:07 pm UTC
 */

class FieldRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'area',
        'crop_id'
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
        return Field::class;
    }

    public function getFieldsWithAlldata()
    {
        $field = new Field();
        $fieldsData = $field->with('processes')->get()->toArray();

        $data = [];

        foreach ($fieldsData as $field) {
            $temp = $field;
            $temp['totalProcessedArea'] = HelperUtil::calculateSum($field['processes']);
            $temp['leftProcessedArea'] = $field['area'] - $temp['totalProcessedArea'] <= 0 ? 0 : $field['area'] - $temp['totalProcessedArea'];

            array_push($data, $temp);
        }

        return $data;
    }

    public function getFieldsStats()
    {

        $fieldsWithProcessData = $this->getFieldsWithAlldata();
        $fields = $this->all()->toArray();

        $totalArea = HelperUtil::calculateSum($fields);
        $processedArea = 0;

        foreach ($fieldsWithProcessData as $field) {
            $processedArea +=  HelperUtil::calculateSum($field['processes']);
        }

        $data = [
            "totalArea" => $totalArea,
            "processedArea" => $processedArea
        ];

        return $data;
    }
}
