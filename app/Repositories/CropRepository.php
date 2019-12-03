<?php

namespace App\Repositories;

use App\Models\Crop;
use App\Repositories\BaseRepository;

/**
 * Class CropRepository
 * @package App\Repositories
 * @version December 1, 2019, 8:02 pm UTC
*/

class CropRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'
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
        return Crop::class;
    }
}
