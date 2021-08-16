<?php

namespace App\Http\Controllers;
use App\Models\UserLogin;
use App\Repositories\Eloquent\UserLoginRepo;
use Illuminate\Http\Request;
use App\GlobalClass\ImsToken;

class UserLoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $userLoginRepo;

    public function __construct(UserLoginRepo $userLoginRepo)
    {
        $this->userLoginRepo = $userLoginRepo;
    }

      protected function curlAdapterGetRequest($urlRequest)
    {
        $this->headers = [];
        $curl = curl_init($urlRequest);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl, CURLOPT_VERBOSE, true);
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_URL, $urlRequest);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);
        return $response;

    }

    public function tes(){
      $data = $this->curlAdapterGetRequest('https://scholar.google.com/scholar?hl=id&as_sdt=0%2C5&q=kendaraan+listrik+torsi+&btnG=');

      $result= json_decode($data);
      print_r($result);
    }

    public function doLogin(Request $request){
      $hasil = $this->userLoginRepo->doLogin($request);
      return response()->json($hasil, $hasil['code']);
    }


    public function aksiAmbilUser(){
       $hasil = $this->userLoginRepo->aksiAmbilUser();
       return response()->json($hasil, $hasil['code']);
    }


    public function aksiTambahUser(Request $request){
       $params = [
         'nama' => $request->input('nama'),
         'alamat' => $request->input('alamat')
       ];
       $hasil = $this->userLoginRepo->aksiTambahUser($params);
       return response()->json($hasil, $hasil['code']);
    }

     public function aksiUbahUser(Request $request){
       $params = [
         'id' => $request->input('id'),
         'nama' => $request->input('nama'),
         'alamat' => $request->input('alamat')
       ];
       $hasil = $this->userLoginRepo->aksiUbahUser($params);
       return response()->json($hasil, $hasil['code']);
    }

    public function aksiHapusUser(Request $request){
       $params = [
         'id' => $request->input('id'),
       ];
       $hasil = $this->userLoginRepo->aksiHapusUser($params);
       return response()->json($hasil, $hasil['code']);
    }
}
