<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Field
 * @package App\Models
 * @version December 1, 2019, 8:07 pm UTC
 *
 * @property string name
 * @property integer area
 * @property integer crop_id
 */
class Field extends Model
{
    use SoftDeletes;

    public $table = 'fields';


    protected $dates = ['deleted_at'];



    public $fillable = [
        'name',
        'area',
        'crop_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'area' => 'integer',
        'crop_id' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'area' => 'required',
        'crop_id' => 'required|exists:crops,id'
    ];

    public function processes()
    {
        return $this->hasMany(Process::class, 'field_id', 'id');
    }

    public function crop()
    {
        return $this->belongsTo(Crop::class, "crop_id");
    }
}
