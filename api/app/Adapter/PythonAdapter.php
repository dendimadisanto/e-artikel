<?php


namespace App\Adapter;


use App\GlobalClass\KonfigurasiEndPoinPython;

class PythonAdapter extends GenericAdapter
{
    public function cariArtikel($data = [])
    {
        $konfigurasiEndPointGlobalClass = new KonfigurasiEndPoinPython();
        $urlRequest = $konfigurasiEndPointGlobalClass->pythonApi().'/artikel/?keyword='.$data['keyword'].'&start='.$data['start'];
        $hasil = $this->curlAdapterGetRequest($urlRequest);
        return $hasil;
    }

    public function cariArtikelGoogle($data = [])
    {
        $konfigurasiEndPointGlobalClass = new KonfigurasiEndPoinPython();
        $urlRequest = $konfigurasiEndPointGlobalClass->pythonApi().'/artikel-google/?keyword='.$data['keyword'].'&start='.$data['start'];
        $hasil = $this->curlAdapterGetRequest($urlRequest);
        return $hasil;
    }

    public function ekstrakText($data = [])
    {
        $konfigurasiEndPointGlobalClass = new KonfigurasiEndPoinPython();
        $urlRequest = $konfigurasiEndPointGlobalClass->pythonApi().'/ekstrak/';
        $hasil = $this->curlAdapterPostRequest($urlRequest, $data);
        return $hasil;
    }
}
