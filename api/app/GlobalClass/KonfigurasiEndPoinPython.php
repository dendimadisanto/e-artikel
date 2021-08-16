<?php
namespace App\Globalclass;

class KonfigurasiEndPoinPython{

	public function __construct(){
		$this->url = 'http://localhost:8000';
	}

	 public function pythonApi()
    {
        return $this->url;
    }
}

?>