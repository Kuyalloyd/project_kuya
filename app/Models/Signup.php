<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signup extends Model
{
    use HasFactory;

    protected $table = 'signup'; // ✅ points to your signup table

    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
