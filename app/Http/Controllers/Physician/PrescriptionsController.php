<?php

namespace App\Http\Controllers\Physician;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrescriptionsController extends Controller
{
    //
    public function index()
    {
        return inertia('Physician/Prescriptions');
    }
}
