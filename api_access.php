<?php
class APIData{

    public array $data;

    public function get_all(){
        $api_url = "https://sampledata.elancoapps.com/data";
        $this->get_data($api_url);
    }

    public function get_plot(string $plot_id){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}";
        $this->get_data($api_url);
    }

    public function get_plot_date(string $plot_id, string $date){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}/date/{$date}";
        $this->get_data($api_url);
    }

    public function get_plot_date_range(string $plot_id, string $start_date, string $end_date){
        $api_url = "https://sampledata.elancoapps.com/data/plot/{$plot_id}/date/{$start_date}/{$end_date}";
        $this->get_data($api_url);
    }

    private function get_data(string $api_url){
        $json_data = file_get_contents($api_url);
        $data = json_decode($json_data);
        $this->data = $data;
    }
}
?>