<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    // Laravel otomatis pakai tabel "feedbacks" untuk model Feedback
    protected $table = 'feedbacks';
    protected $primaryKey = 'feedback_id';
    public $timestamps = true;

    protected $fillable = ['user_id', 'message'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'user_id', 'user_id');
    }
}
