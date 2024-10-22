<?php

namespace App\Http\Controllers\Physician;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConsultationsController extends Controller
{
    //
    public function index()
    {
        return inertia('Physician/Consultations');
    }
}
