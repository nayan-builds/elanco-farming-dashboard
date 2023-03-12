<?php
class APIGet{

    // public array $data;

    public function get_all(){
        $api_url = "https://sampledata.elancoapps.com/data";
        return $this->get_data($api_url);
        // $this->get_data($api_url);
    }

    public function get_plot(string $plot_id){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}";
        return $this->get_data($api_url);
        // $this->get_data($api_url);
    }

    public function get_plot_date(string $plot_id, string $date){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}/date/{$date}";
        return $this->get_data($api_url);
        // $this->get_data($api_url);
    }

    public function get_plot_date_range(string $plot_id, string $start_date, string $end_date){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}/date/{$start_date}/{$end_date}";
        return $this->get_data($api_url);
        // $this->get_data($api_url);
    }

    private function get_data(string $api_url){
        $json_data = file_get_contents($api_url);
        $data = json_decode($json_data);
        return $data[0];
        // $this->data = $data[0];
    }

    public function get_plot_averages(string $plot_id){
        $plot_data = $this->get_plot($plot_id);
        //TODO
        $count = 0;
        $averages = new SensorData();
        foreach($plot_data as $plot_date_data){
            $averages->ph += $plot_date_data->PH;
            $averages->temp += $plot_date_data->Temp_C;
            $averages->humidity += $plot_date_data->AVG_Humidity__;
            $averages->light += $plot_date_data->AVG_Light__;
            $count++;
        }
        $averages->ph = round($averages->ph / $count, 2);
        $averages->temp = round($averages->temp / $count, 2);
        $averages->humidity = round($averages->humidity / $count, 2);
        $averages->light = round($averages->light / $count, 2);
        return $averages;
    }
}

class SensorData{
    public $ph;
    public $temp;
    public $humidity;
    public $light;
}
?>