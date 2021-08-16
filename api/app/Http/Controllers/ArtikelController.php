<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\Eloquent\ArtikelRepo;

class ArtikelController extends Controller{

	private $ArtikelRepo;
	public function __construct(ArtikelRepo $ArtikelRepo){
		$this->ArtikelRepo = $ArtikelRepo;
	}

	public function getDataPencarian(Request $request){
		$res = $this->ArtikelRepo->getDataPencarian($request);
        return response()->json($res, $res['code']);
	}

	public function storePencarian(Request $request){
		$res = $this->ArtikelRepo->storePencarian($request);
        return response()->json($res, $res['code']);
	}

	public function hapusPencarian(Request $request){
		$res = $this->ArtikelRepo->hapusPencarian($request);
        return response()->json($res, $res['code']);
	}

	public function getDataKeyword(Request $request){
		$res = $this->ArtikelRepo->getDataKeyword($request);
        return response()->json($res, $res['code']);
	}

	public function getDataDokumen(Request $request){
		$res = $this->ArtikelRepo->getDataDokumen($request);
        return response()->json($res, $res['code']);
	}

	public function storeKeyword(Request $request){
		$res = $this->ArtikelRepo->storeKeyword($request);
        return response()->json($res, $res['code']);
	}

	public function hapusKeyword(Request $request){
		$res = $this->ArtikelRepo->hapusKeyword($request);
        return response()->json($res, $res['code']);
	}

	public function cariArtikel(Request $request){
		$res = $this->ArtikelRepo->cariArtikel($request);
		return response()->json($res, $res['code']);
	}

	public function cariArtikelGoogle(Request $request){
		$res = $this->ArtikelRepo->cariArtikelGoogle($request);
		return response()->json($res, $res['code']);
	}

	public function simpanFile(Request $request){
		$res = $this->ArtikelRepo->simpanFile($request);
		return response()->json($res, $res['code']);
	}

	public function simpanDokumenArtikel(Request $request){
		$res = $this->ArtikelRepo->simpanDokumenArtikel($request);
		return response()->json($res, $res['code']);
	}

	public function hapusDokumen(Request $request){
		$res = $this->ArtikelRepo->hapusDokumen($request);
        return response()->json($res, $res['code']);
	}
}

?>