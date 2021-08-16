<?php

namespace App\Adapter;


class GenericAdapter
{
    private $headers;
    protected $host;

    protected function curlAdapterPostRequest($urlRequest, $postData)
    {
        $this->headers = [];
        $curl = curl_init($urlRequest);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl, CURLOPT_VERBOSE, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_URL, $urlRequest);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
        $response = curl_exec($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);
        return $response;

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
}
