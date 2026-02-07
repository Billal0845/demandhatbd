<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'brand',
        'color',
        'weight',
        'length',
        'width',
        'price',
        'stock',
        'description',
        'specification',
        'image',
        'quick_view',
        'short_description',
        'sku',
        'bussiness_class',
        'discount'
    ];

    // Relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }



    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    protected $casts = [
        'price' => 'decimal:2', // Ensures price always has 2 decimal places (e.g. 10.00)
        'weight' => 'float',
        'length' => 'float',
        'width' => 'float',
        'stock' => 'integer',
        'discount' => 'float',
    ];
}