import React, { Component, ReactElement } from "react";
import moment, { Moment } from "moment/moment";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";

interface Day {
  name: string;
  number: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Moment;
}

interface WeekProps {
  date: Moment;
  month: Moment;
  selected: Moment;
  select: (day: Moment) => void;
}

class Week extends Component<WeekProps> {
  renderDays = (): ReactElement[] => {
    const { date, month, selected, select } = this.props;
    const days: ReactElement[] = [];

    let currentDate = date.clone().startOf("week");

    for (let i = 0; i < 7; i++) {
      const day: Day = {
        name: currentDate.format("dd").substring(0, 1),
        number: currentDate.date(),
        isCurrentMonth: currentDate.month() === month.month(),
        isToday: currentDate.isSame(new Date(), "day"),
        date: currentDate.clone(),
      };

      days.push(
        <DayComponent
          key={currentDate.toString()}
          day={day}
          selected={selected}
          select={select}
        />
      );

      currentDate = currentDate.clone().add(1, "day");
    }

    return days;
  };

  render() {
    return <div className="row week">{this.renderDays()}</div>;
  }
}

interface DayProps {
  day: Day;
  selected: Moment;
  select: (day: Moment) => void;
}

const DayComponent: React.FC<DayProps> = ({ day, selected, select }) => {
  return (
    <span
      className={
        "day" +
        (day.isToday ? " today" : "") +
        (day.isCurrentMonth ? "" : " different-month") +
        (day.date.isSame(selected, "day") ? " selected" : "")
      }
      onClick={() => select(day.date)}
    >
      {day.number}
    </span>
  );
};

interface CalendarProps {
  onDateSelect: (date: Moment) => void;
}

interface CalendarState {
  month: Moment;
  selected: Moment;
}

class Calendar extends Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      month: moment(),
      selected: moment().startOf("day"),
    };
  }

  previous = () => {
    this.setState({
      month: this.state.month.clone().subtract(1, "month"),
    });
  };

  next = () => {
    this.setState({
      month: this.state.month.clone().add(1, "month"),
    });
  };

  select = (day: Moment) => {
    this.setState({
      selected: day,
      month: day.clone(),
    });

    // Appel de la fonction de rappel avec la date sélectionnée
    this.props.onDateSelect(day);
  };

  renderMonthLabel = (): string => {
    return this.state.month.format("MMMM YYYY");
  };

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">
            <i className="arrow fa fa-angle-left" onClick={this.previous} />
            <span className="month-label">{this.renderMonthLabel()}</span>
            <i className="arrow fa fa-angle-right" onClick={this.next} />
          </div>
          <DayNames />
        </header>
        <div className="weeks">
          {this.renderWeeks(this.state.month, this.state.selected)}
        </div>
      </section>
    );
  }

  renderWeeks = (month: Moment, selected: Moment): ReactElement[] => {
    const weeks: ReactElement[] = [];
    let done = false;
    let currentDate = month.clone().startOf("month").startOf("week");

    while (!done) {
      weeks.push(
        <Week
          key={currentDate.toString()}
          date={currentDate.clone()}
          month={month}
          selected={selected}
          select={this.select}
        />
      );

      currentDate.add(1, "week");

      done = weeks.length > 2 && currentDate.month() !== month.month();
    }

    return weeks;
  };
}

class DayNames extends Component {
  render() {
    return (
      <div className="row day-names">
        <span className="day">S</span>
        <span className="day">M</span>
        <span className="day">T</span>
        <span className="day">W</span>
        <span className="day">T</span>
        <span className="day">F</span>
        <span className="day">S</span>
      </div>
    );
  }
}

export default Calendar;
