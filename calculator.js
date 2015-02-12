$(document).ready(function() {
    $('.tooltip').tooltipster({
      maxWidth: 300,
    });

    $('#calculator .question').click(function(){
      $('#calculator .expand').slideToggle();
    });

    $('#assignment-length').on('change', function (e) {
        var valueSelected = this.value;

        if (valueSelected == 'other') {
            $('#assignment-length-other').show('');
        } else {
            $('#assignment-length-other').hide('');
        }

    });

    
    function calculateTotals(){
      hourly = $('#hourly').val();
      length = $('#assignment-length').val();
      weekly_hrs = $('#weekly-hours').val();
      pay_status  = $('#pay-status').val();
      
      if (length=='other') {
         length = $('#assignment-length-other').val();
         }

      length = parseInt(length,10) || 0;

      if (weekly_hrs=='3x12') {
         weekly_hours = 36
         }
      else if (weekly_hrs=='5x8'){
         weekly_hours = 40
         }
      else if (weekly_hrs=='4x10'){
         weekly_hours = 40
         }
      else if (weekly_hrs=='4x12'){
         weekly_hours = 48
         }
      else {
         weekly_hours = 34.5
         }
      
      /* alert(weekly_hours); */
      
      completion = $('#completion').val();
      stipend = $('#stipend').val();
      insurance = $('#insurance').val();
      travel_pay = $('#travel-pay').val();
      op_taxed = $('#op-taxed').val();
      op_taxfree = $('#op-taxfree').val();
      od_taxed = $('#od-taxed').val();
      od_taxfree = $('#od-taxfree').val();
      per_diem = $('#per-diem').val();

      /* Clean these values up to make sure they are integers */
      completion = parseInt(completion,10) || 0;
      stipend = parseInt(stipend,10) || 0;
      insurance = parseInt(insurance,10) || 0;
      travel_pay = parseInt(travel_pay,10) || 0;
      op_taxed = parseInt(op_taxed,10) || 0;
      op_taxfree = parseInt(op_taxfree,10) || 0;
      od_taxed = parseInt(od_taxed,10) || 0;
      od_taxfree = parseInt(od_taxfree,10) || 0;
      per_diem = parseInt(per_diem,10) || 0;
      
      per_diem_period = $('#per-diem-period').val();
      
      /* note: this needs to be made more nuanced */
      /* xxx there is a calculation error here, rework */
      if (per_diem_period=='weekly') {
         hourly_per_diem = per_diem/8
         }
      else {
         hourly_per_diem = per_diem/40
         }
      
      hourly = parseInt(hourly,10) || 0;
      hourly_per_diem = parseInt(hourly_per_diem,10) || 0;
      
      
      months = length/4.3;
      
      
      
      one_time = (completion+stipend+insurance+travel_pay+op_taxed+op_taxfree)-(od_taxed+od_taxfree+travel)
      
      
      hours = length*weekly_hours;
      
      hourly_one_time = one_time/hours
      
      total_hourly =  (hourly+hourly_one_time+hourly_per_diem).toFixed(2);
      
      total_hourly = 1.1*total_hourly
      
      total_contract = (hours*total_hourly).toFixed(2);
      total_weekly = (total_hourly*weekly_hours).toFixed(2);
      
      total_yearly = (total_weekly*50).toFixed(2);
      
      composite_hourly = hourly+hourly_per_diem;
      
      $('#total_hours').html(hours);
      
      $('#pay_hour').html(total_hourly);
      $('#pay_week').html(total_weekly);
      $('#pay_contract').html(total_contract);
      $('#pay_year').html(total_yearly);
      
      taxfree_per_hour = (op_taxfree-od_taxfree)/hours
      
      tax_hourly =  ((total_hourly-taxfree_per_hour)*.333).toFixed(2);
      tax_weekly = (tax_hourly*weekly_hours).toFixed(2);
      tax_contract = (hours*tax_hourly).toFixed(2);
      tax_yearly = (tax_weekly*50).toFixed(2);
      
      $('#tax_hour').html(tax_hourly);
      $('#tax_week').html(tax_weekly);
      $('#tax_contract').html(tax_contract);
      $('#tax_year').html(tax_yearly);
      
      net_hourly = (total_hourly - tax_hourly).toFixed(2);
      net_weekly = (total_weekly - tax_weekly).toFixed(2);
      net_contract = (total_contract - tax_contract).toFixed(2);
      net_yearly = (total_yearly - tax_yearly).toFixed(2);

      $('#net_hour').html(net_hourly);
      $('#net_week').html(net_weekly);
      $('#net_contract').html(net_contract);
      $('#net_year').html(net_yearly);

    };
    
    $('#calculator input').keyup(function() {
      calculateTotals();
    });
    
    $( "select" ).change(function() {
      calculateTotals();
    });
    
});