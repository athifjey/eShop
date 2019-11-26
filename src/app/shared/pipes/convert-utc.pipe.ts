import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUTC'
})
export class ConvertUTCPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    var d = new Date(value)
    var month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    function formatAMPM(value) {
      var hours = value.getHours();
      var minutes = value.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    var newDate = d.getUTCDate() + ' ' + month[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ' ' + formatAMPM(d);
   
    return newDate;
  }

}
