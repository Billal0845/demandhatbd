<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingSection extends Model
{
    protected $fillable = [
        'category_name',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


}
