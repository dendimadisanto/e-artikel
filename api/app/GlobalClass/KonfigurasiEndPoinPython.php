<?php
namespace App\Globalclass;

class KonfigurasiEndPoinPython{

	public function __construct(){
		$this->url = env('APP_URL_PYTHON');
	}

	 public function pythonApi()
    {
        return $this->url;
    }
}

?>