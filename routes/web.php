<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Physician\TreatmentController;
use App\Http\Controllers\Physician\PrescriptionsController;
use App\Http\Controllers\Physician\AppointmentsController;
use App\Http\Controllers\Physician\DiagnosisController;
use App\Http\Controllers\Physician\MedicalHistoryController;
use App\Http\Controllers\Physician\PatientsController;
use App\Http\Controllers\Physician\ConsultationsController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Add routes for user roles
Route::middleware(['auth', 'verified', 'patient'])->group(function () {
    Route::get('/patient-dashboard', function () {
        return Inertia::render('Patient/Dashboard');
    })->name('patient-dashboard');
});

Route::middleware(['auth', 'verified', 'physician'])->group(function () {
    Route::get('/physician-dashboard', function () {
        return Inertia::render('Physician/Dashboard');
    })->name('physician-dashboard');
    Route::get('/physician/treatments', [TreatmentController::class, 'index'])->name('physician.treatments');
    Route::get('/physician/prescriptions', [PrescriptionsController::class, 'index'])->name('physician.prescriptions');
    Route::get('/physician/appointments', [AppointmentsController::class, 'index'])->name('physician.appointments');
    Route::get('/physician/diagnosis', [DiagnosisController::class, 'index'])->name('physician.diagnosis');
    Route::get('/physician/medical-history', [MedicalHistoryController::class, 'index'])->name('physician.medical-history');
    Route::get('/physician/patients', [PatientsController::class, 'index'])->name('physician.patients');
    Route::get('/physician/consultations', [ConsultationsController::class, 'index'])->name('physician.consultations');

});
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin-dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin-dashboard');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
