<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RedirectController extends Controller
{
    //
    public function index()
    {
        $role = auth()->user()->role;
        if ($role === 'admin') {
            return redirect('/admin-dashboard');
        } elseif ($role === 'physician') {
            return redirect('/physician-dashboard');
        } elseif ($role === 'patient') {
            return redirect('/patient-dashboard');
        } elseif ($role === 'pharmacist') {
            return redirect('/pharmacist-dashboard');
        }
        return redirect('/');
    }

}
