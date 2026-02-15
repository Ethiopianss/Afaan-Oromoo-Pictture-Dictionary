<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Word extends Model
{
    protected $fillable = [
        'word_oromo',
        'word_english',
        'definition',
        'image_path',
        'audio_path',
        'category_id'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
