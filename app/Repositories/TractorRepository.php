<?php

namespace App\Repositories;

use App\Models\Tractor;
use App\Repositories\BaseRepository;

/**
 * Class TractorRepository
 * @package App\Repositories
 * @version December 1, 2019, 8:03 pm UTC
*/

class TractorRepository extends BaseRepository
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
        return Tractor::class;
    }
}
