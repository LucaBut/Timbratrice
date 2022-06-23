<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware {
    public function handle($request, Closure $next) {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization')
            ->header ('Access-Control-Allow-Credentials', 'true')
            ->header ('Access-Control-Request-Method', 'POST,GET,PUT,DELETE,OPTIONS')
            ->header ('Access-Control-Max-Age', '86400');
    }
}
