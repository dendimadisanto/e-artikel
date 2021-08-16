<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\URL;
use App\Presentation\ResponseCreator;
use Illuminate\Http\Request;
use App\GlobalClass\ImsToken;
use DateTime;

class HakAkses
{
    public function handle($request, Closure $next)
    {
        try {
            $token = $request->header('TOKEN');
            $penggunaAktif = ImsToken::claimToken($token);

            $now = new DateTime(date('Y-m-d H:i:s'));
            $expired = new DateTime(date($penggunaAktif['expired_time']));
            
            
            if($expired < $now){
                $response = new ResponseCreator(401, 'Penguna tidak valid, silakan melakukan login ulang', null, []);
                $respon = $response->getResponse();
                return response()->json($respon, $respon['code']);
            }

             return $next($request);
           
        } catch (\Exception $e) {
            $response = new ResponseCreator(500, 'Terjadi kesalahan pada server', null, []);
            $respon = $response->getResponse();
            return response()->json($respon, $respon['code']);
        }

    }

}