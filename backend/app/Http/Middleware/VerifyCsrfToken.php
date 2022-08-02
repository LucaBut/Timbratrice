<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/api/reg',
        '/api/login',
        '/api/logout',
        '/api/start',
        '/api/fine',
        '/api/reg-admin',
        '/api/change',
        '/api/calendario',
        '/api/tk',
        '/api/calendar-start',
        '/api/ora',
        '/api/orario',
        '/api/export/upload',
        '/api/export',
        '/api/event/upload',
        '/api/event',

    ];
}
