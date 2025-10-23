<?php

namespace App\Models; //ngasih tahu kalau ini ada di folder App\Models

use Illuminate\Foundation\Auth\User as Authenticatable; //ngasih tahu kalau ini model user yang bisa di autentikasi
use Illuminate\Notifications\Notifiable; //ngasih tahu kalau ini model yang bisa dikasih notifikasi

class Customer extends Authenticatable //model Customer itu diambil dari model User yang bisa di autentikasi
{
    use Notifiable;

    protected $table = 'customers';
    protected $primaryKey = 'user_id';

    protected $fillable = ['nik', 'email', 'password', 'first_name', 'last_name', 'birth_of_date', 'phone_number'];
}
