<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\Eloquent\MasterRepo;

class MasterController extends Controller{

	private $MasterRepo;
	public function __construct(MasterRepo $MasterRepo){
		$this->MasterRepo = $MasterRepo;
	}

	public function getDataKategori(Request $request){
		$res = $this->MasterRepo->getDataKategori($request);
        return response()->json($res, $res['code']);
	}

	public function storeKategori(Request $request){
		$res = $this->MasterRepo->storeKategori($request);
        return response()->json($res, $res['code']);
	}

	public function hapusKategori(Request $request){
		$res = $this->MasterRepo->hapusKategori($request);
        return response()->json($res, $res['code']);
	}
}

?>