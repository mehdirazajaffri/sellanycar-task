<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Process
 * @package App\Models
 * @version December 1, 2019, 8:13 pm UTC
 *
 * @property integer tractor_id
 * @property integer field_id
 * @property string date
 * @property integer area
 */
class Process extends Model
{
    use SoftDeletes;

    public $table = 'processes';


    protected $dates = ['deleted_at'];



    public $fillable = [
        'tractor_id',
        'field_id',
        'date',
        'area'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'tractor_id' => 'integer',
        'field_id' => 'integer',
        'date' => 'date',
        'area' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'tractor_id' => 'required|exists:tractors,id',
        'field_id' => 'required|exists:fields,id',
        'date' => 'required',
        'area' => 'required'
    ];


    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id');
    }

    public function tractor()
    {
        return $this->belongsTo(Tractor::class, "tractor_id");
    }
}
