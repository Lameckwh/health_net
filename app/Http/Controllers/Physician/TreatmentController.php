<?php

namespace App\Http\Controllers\Physician;

use App\Http\Controllers\Controller;

class TreatmentController extends Controller
{
    public function index()
    {
        return inertia('Physician/Treatments');
    }
}
