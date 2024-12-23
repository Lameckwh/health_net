<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;


use App\Http\Controllers\Physician\AppointmentsController;
use App\Http\Controllers\Physician\DiagnosisController;
use App\Http\Controllers\Physician\MedicalHistoryController;
use App\Http\Controllers\Physician\PatientsController;
use App\Http\Controllers\Physician\ConsultationsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Patient\PatientDashboardController;
use App\Http\Controllers\Patient\PatientComplaintsController;
use App\Http\Controllers\Patient\PatientAppointmentsController;
use App\Http\Controllers\Patient\PatientMedicalHistoryController;
use App\Http\Controllers\Pharmacist\MedicalDrugsController;
use App\Http\Controllers\Pharmacist\PharmacistDashboard;
use App\Http\Controllers\Pharmacist\PrescriptionsController;
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
// Define a fallback route to handle 404
Route::fallback(function () {
    return Inertia::render('NotFound')->withViewData(['title' => 'Page Not Found']);
});

Route::get('/notfound', function () {
    return Inertia::render('NotFound');
})->name('notfound');

// Add routes for user roles
Route::middleware(['auth', 'verified', 'patient'])->group(function () {

    Route::get('/patient-dashboard', [PatientDashboardController::class, 'index'])->name('patient-dashboard');
    Route::get('/patients/complaints', [PatientComplaintsController::class, 'index']);
    Route::get('/patients/medical-history', [PatientMedicalHistoryController::class, 'index']);
    Route::get('/patients/appointments', [PatientAppointmentsController::class, 'index']);
});
Route::middleware(['auth', 'verified', 'pharmacist'])->group(function () {
    Route::get('/pharmacist-dashboard', [PharmacistDashboard::class, 'index'])->name('pharmacist-dashboard');
    Route::get('/pharmacist/prescriptions', [PrescriptionsController::class, 'index'])->name('pharmacist.prescriptions');
    Route::get('/pharmacist/medical-drugs', [MedicalDrugsController::class, 'index'])->name('pharmacist.medical-drugs');
});


Route::middleware(['auth', 'verified', 'physician'])->group(function () {
    Route::get('/physician-dashboard', [DashboardController::class, 'index'])->name('physician-dashboard');
    Route::get('/physician/prescriptions', [PrescriptionsController::class, 'index'])->name('physician.prescriptions');
    Route::get('/physician/appointments', [AppointmentsController::class, 'index'])->name('physician.appointments');
    Route::get('/physician/diagnosis', [DiagnosisController::class, 'index'])->name('physician.diagnosis');
    Route::get('/physician/medical-history', [MedicalHistoryController::class, 'index'])->name('physician.medical-history');
    Route::get('/physician/patients', [PatientsController::class, 'index'])->name('physician.patients');
    Route::get('/physician/consultations', [ConsultationsController::class, 'index'])->name('physician.consultations');
});

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin-dashboard', [UserController::class, 'index'])->name('admin-dashboard');
    Route::post('/admin/users/create', [UserController::class, 'store'])->name('admin.users.create');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::post('/admin/users/{id}/update-role', [UserController::class, 'updateRole'])->name('admin.users.update-role');
    Route::post('/admin/users/{id}/deactivate', [UserController::class, 'deactivate'])->name('admin.users.deactivate');
    Route::post('/admin/users/{id}/activate', [UserController::class, 'activate'])->name('admin.users.activate');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
