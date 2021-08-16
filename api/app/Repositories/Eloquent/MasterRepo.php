<?php
namespace App\Repositories\Eloquent;
use App\Repositories\Eloquent\GenericEloquentRepo;
use App\GlobalClass\KonfigurasiDokumen;
use App\Presentation\ResponseCreator;
use Carbon\Carbon;
use App\Models\Kategori;
use App\GlobalClass\ImsToken;

class MasterRepo extends GenericEloquentRepo{

	public function getDataKategori($params){
		try{
			$data = Kategori::selectRaw('id, false editable, kategori')->whereNull('dihapus_pada')->get();
			$response = new ResponseCreator(200, 'Berhasil di dapat', $data, []);

		}
		catch(\Exception $e){
			$error[] = $e->getMessage();
			$response = new ResponseCreator(500, 'Terjadi Kesalahan pada server', [], $error);
		}
		return $response->getResponse();
	}

	public function storeKategori($params){
		try{
			if($params->id){
				$data = Kategori::find($params->id);
				$data->diubah_pada = Carbon::now();
				$data->kategori = $params->kategori;
				$data->save();
			}
			else{
				$data = new Kategori();
				$data->dibuat_pada = Carbon::now();
				$data->kategori = $params->kategori;
				$data->save();
			}


			$response = new ResponseCreator(200, 'Berhasil di simpan', [], []);

		}
		catch(\Exception $e){
			$error[] = $e->getMessage();
			$response = new ResponseCreator(500, 'Terjadi Kesalahan pada server', [], $error);
		}
		return $response->getResponse();
	}

	public function hapusKategori($params){
		try{
			$data = kategori::find($params->id);
			$data->dihapus_pada = Carbon::now();
			$data->save();


			$response = new ResponseCreator(200, 'Berhasil di hapus', [], []);

		}
		catch(\Exception $e){
			$error[] = $e->getMessage();
			$response = new ResponseCreator(500, 'Terjadi Kesalahan pada server', [], $error);
		}
		return $response->getResponse();
	}

	
}
?>